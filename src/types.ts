export type TData = {
  project: string;
  period: string;
  chart: TChart;
};

export type TChart = {
  id: number;
  title: string;
  period_start: string;
  period_end: string;
  sub?: TChart[];
};

export type TTask = {
  id: number;
  title: string;
  start: string;
  end: string;
  level: number;
};

export type TDurationTable = {
  columnNumber: number;
  tasks: TTask[];
  monthDiff: number | null;
  startDate: Date | null;
  endDate: Date | null;
};

export type TColor = {
  [x: number]: string;
};

export type TBorder = {
  [x: number]: string;
};

export type TTaskProps = {
  id: number;
  start: string;
  end: string;
  sub?: TChart[];
  level: number;
  className?: string;
  title: string;
};

export type TDaysArr = number[];

export type TButtonProps = {
  icon?: string;
  onClick: (prop: boolean) => void;
  btnState: boolean;
  className: string;
};