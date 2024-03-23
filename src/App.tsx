import { useEffect } from "react";

import GlobalStyle from "./styles/globalStyle";

import "components/FontawesomeIcons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreeView from "components/TreeView";
import { treeData } from "components/TreeView/mockTreeData";

import { makeServer } from "./server";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}
export default function App() {
  useEffect(() => {
    const url = `/api/users`;

    fetch(url).then((res) => console.log(res));
  }, []);
  return (
    <>
      <GlobalStyle />
      <div>
        App component
        <FontAwesomeIcon icon="caret-right" />
      </div>
      <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
      <TreeView data={treeData} />
    </>
  );
}
