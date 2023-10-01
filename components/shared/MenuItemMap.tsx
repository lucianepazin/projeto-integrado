import MenuItem from "@mui/material/MenuItem";

export default function MenuItemMap(
  option:
    | {
        label?: string;
        value: string | number;
        disabled?: boolean;
      }
    | string,
  index: number,
) {
  if (typeof option === "string") {
    return (
      <MenuItem key={index} value={option}>
        {option}
      </MenuItem>
    );
  }
  return (
    <MenuItem
      disabled={option?.disabled}
      key={index}
      value={option.value ?? undefined}
    >
      {option.label === "" ? <>&nbsp;</> : option.label}
    </MenuItem>
  );
}

export const MenuItemMapCustomCreator = <T extends { [key: PropertyKey]: any }>(
  valueKey: keyof T = "value",
  labelKey: keyof T = "label",
) =>
  function CustomItemMap(option: T, index: number) {
    return (
      <MenuItem
        disabled={option?.disabled}
        key={index}
        value={option[valueKey]}
      >
        {option[labelKey]}
      </MenuItem>
    );
  };
