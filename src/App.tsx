import { useEffect } from "react";

import GlobalStyle from "./styles/globalStyle";

import "components/FontawesomeIcons/index";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TreeView from "components/TreeView";
import { treeData } from "components/TreeView/mockTreeData"; */
import { Container } from "@mui/material";

//import { makeServer } from "./server";
import { startMirage } from "./mirage/config";
import { Dictionary } from "./components/Dictionary/Dictionary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

if (process.env.NODE_ENV === "development") {
  startMirage({ environment: "development" });
}
export default function App() {
  /* useEffect(() => {
    const url = `/dictionaryItems?parentId=1`;

    fetch(url).then((res) => console.log(res));
  }, []); */
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Container>
        <Dictionary />
      </Container>
      {/*  <div>
        App component
        <FontAwesomeIcon icon="caret-right" />
      </div>
      <FontAwesomeIcon icon="check-square" />
      Your <FontAwesomeIcon icon="coffee" /> is hot and ready!
      <TreeView data={treeData} /> */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
