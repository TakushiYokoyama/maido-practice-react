export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'className' | 'style'
>;
