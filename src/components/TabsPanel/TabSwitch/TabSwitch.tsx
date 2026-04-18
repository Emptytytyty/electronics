type TabSwitchProps = {
  className: string;
  tabName: string;
  onSwitch: () => void;
}

export const TabSwitch = ({className, tabName, onSwitch}: TabSwitchProps) => {
  return (
    <button className={className} onClick={onSwitch}>{tabName}</button>
  )
}