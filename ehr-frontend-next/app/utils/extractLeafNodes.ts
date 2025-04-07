// utils/extractLeafNodes.ts
export function extractLeafNodes(node, path = "") {
    const fullPath = path ? `${path}/${node.id}` : node.id;
    const leaves = [];
  
    if (node.rmType && node.inputs) {
      leaves.push({ ...node, path: fullPath });
    }
  
    if (node.children && node.children.length) {
      node.children.forEach(child => {
        leaves.push(...extractLeafNodes(child, fullPath));
      });
    }
  
    return leaves;
  }