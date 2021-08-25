export type TabItem = {
  label: string;
  value: string;
  content: React.ReactNode;
}

export type TabPanelProps = {
  index: string | number;
  value: string | number;
  isHidden: boolean;
  children: React.ReactNode;
}

export type TabsProps = {
  tabs: TabItem[];
  currentTab: string;
  onTabChange: (_: React.ChangeEvent<{}>, newValue: string) => void;
}