export interface DropdownItem {
  label: string;
  href: string;
  isHeader?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
}