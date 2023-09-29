"use client";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Pet } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function PetSwipe() {
  const { data, isInitialLoading } = useQuery<Pet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await fetch("api/pets");
      return await res.json();
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnReconnect: false,
  });
  const pets = data || [];

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = pets.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Paper
      sx={{
        maxWidth: 400,
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        {isInitialLoading ? (
          <Skeleton width={250} />
        ) : (
          <Typography>{pets?.[activeStep]?.nome}</Typography>
        )}
      </Paper>
      {isInitialLoading ? (
        <Skeleton width={400} height={255} variant="rectangular" />
      ) : (
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          style={{ width: "400px" }}
        >
          {pets.map((pet, index) => (
            <Box key={pet.codPet} sx={{ width: "400px" }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component={Link}
                  href={`/pets/${pet.codPet}`}
                  sx={{
                    display: "block",
                    position: "relative",
                    height: "255px",
                    width: "400px",
                  }}
                >
                  <Box
                    component={Image}
                    sx={{
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    fill={true}
                    src={pet.fotoUrl}
                    alt={pet.nome}
                  />
                </Box>
              ) : null}
            </Box>
          ))}
        </AutoPlaySwipeableViews>
      )}
      <MobileStepper
        steps={isInitialLoading ? 5 : maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Próximo
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }
      />
    </Paper>
  );
}

export default PetSwipe;
