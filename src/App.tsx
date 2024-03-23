import GlobalStyle from "./styles/globalStyle";
import "components/FontawesomeIcons/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreeView from "components/TreeView";
import { treeData } from "components/TreeView/mockTreeData";

export default function App() {
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
