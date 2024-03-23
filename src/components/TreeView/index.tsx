import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { styled } from 'styled-components'

type TreeNodeType = {
  key: string
  label: string
  icon?: string
  title: string
  children?: Array<TreeNodeType>
}
type TreeNodePropsType = {
  node: TreeNodeType
}
type TreeViewPropsType = {
  data?: Array<TreeNodeType>
}
const TreeViewStyled = styled.div`
  padding-left: 10px;
`
const Icon = styled.div`
  margin-right: 5px;
  color: yellowgreen;
`

const TreeView = ({ data = [] }: TreeViewPropsType) => {
  return (
    <TreeViewStyled>
      <ul>
        {data.map((tree) => (
          <TreeNode node={tree} />
        ))}
      </ul>
    </TreeViewStyled>
  )
}

const TreeNodeStyled = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  padding-left: 10px;
`

const TreeNode = ({ node }: TreeNodePropsType) => {
  const [childVisible, setChildVisiblity] = useState(false)

  const hasChild = node.children ? true : false

  return (
    <li>
      <TreeNodeStyled onClick={() => setChildVisiblity((v) => !v)}>
        {hasChild ? (
          <Icon>
            <FontAwesomeIcon icon={childVisible ? 'folder-open' : 'folder'} />
          </Icon>
        ) : (
          <Icon>
            <FontAwesomeIcon icon="file" />
          </Icon>
        )}

        <div>{node.label}</div>
      </TreeNodeStyled>

      {hasChild && childVisible && (
        <div>
          <ul>
            <TreeView data={node.children} />
          </ul>
        </div>
      )}
    </li>
  )
}
export type { TreeNodeType, TreeNodePropsType, TreeViewPropsType }
export default TreeView
