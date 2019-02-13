export const QUERY_DEPARTMENT_LIST = `
    query departmentList($before:String,$after:String,$first:Int,$last:Int,$superior:String,$departmentName:String,$location:String,$orderBy:String) {
      departmentList(before:$before,after:$after,first:$first,last:$last,superior:$superior,departmentName:$departmentName,location:$location,orderBy:$orderBy) {
        edges {
          node {
            id
            departmentName
            superior {
             id
            }
          }
        }
      }
    }
`;
