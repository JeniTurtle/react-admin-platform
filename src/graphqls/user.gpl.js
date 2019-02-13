export const QUERY_USER_LIST_GPL = `
    query ($first:Int,$last:Int,$before:String,$after:String,$username:String,$realName:String,$mobile:String,$email:String,$order:String,$gender:String,$isActive:Boolean) {
      userList (first:$first,last:$last,before:$before,after:$after,username:$username,realName:$realName,mobile:$mobile,email:$email,orderBy:$order,gender:$gender,isActive:$isActive) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            username
            realName
            isStaff
            mobile
            email
            gender
            isActive
            createTime
            department {
              id
              departmentName
            }
          }
          cursor
        }
      }
    }
`;

export const QUERY_USER_INFO_GPL = `
    query userUserInfo($id: ID!) {
      userUserInfo(id: $id) {
        id
        isSuperuser
        username
        realName
        gender
        mobile
        email
        isActive
        department {
          departmentName
        }
        createTime
      }
    }
`;

export const QUERY_USER_INFO_AND_GROUPS_GPL = `
    query userUserInfo($id: ID!) {
      userUserInfo(id: $id) {
        id
        isSuperuser
        username
        realName
        gender
        mobile
        email
        isActive
        department {
          departmentName
        }
        groups {
          edges {
            node {
              id
              name
            }
          }
        }
        createTime
      }
      groupList {
        id
        name
      }
    }
`;

export const ADD_USER_GPL = `
    mutation registerUser($input: RegisterUserInput!) {
      userRegisterUser(input: $input) {
        payload {
          id
          username
          gender
          isActive
          mobile
          email
        }
      }
    }
`;
