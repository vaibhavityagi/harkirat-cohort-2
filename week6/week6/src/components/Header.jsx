// export function Header({ title }) {
//   return <div>{title}</div>;
// }

import { memo } from "react";
// memo let's you skip re-rendering a component if the props of that particular component doesn't change

export const Header = memo(({ title = "Default name" }) => {
  return <div>{title}</div>;
});
