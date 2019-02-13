import React from 'react'
import './TablePagination.scss'

class TablePagination extends React.Component {

    prevPage = () => {
        const { pageChangedHandle, pageInfo, pageItemNum } = this.props;
        const { startCursor, currentPage } = pageInfo;
        if (currentPage > 2) {
            pageChangedHandle({
                before: startCursor,
                last: pageItemNum,
                currentPage: currentPage - 1,
            })
        } else if (currentPage === 2) {
            pageChangedHandle({
                first: pageItemNum,
                currentPage: currentPage - 1,
            })
        }
    };

    nextPage = () => {
        const { pageChangedHandle, pageInfo, pageItemNum } = this.props;
        const { hasNextPage, hasPreviousPage, endCursor, currentPage } = pageInfo;
        if (hasNextPage || hasPreviousPage) {
            pageChangedHandle({
                after: endCursor,
                first: pageItemNum,
                currentPage: currentPage + 1,
            })
        }
    };

    render() {
        const { hasNextPage, hasPreviousPage, currentPage } = this.props.pageInfo;

        return (
            <div>
                <ul className="ant-pagination ant-table-pagination">
                    <li className={`ant-pagination-prev ${currentPage <= 1 && "ant-pagination-disabled"}`} onClick={ this.prevPage }>
                        <a className="ant-pagination-item-link" />
                    </li>
                    <li className="ant-pagination-item ant-pagination-item-active">
                        <a>{ currentPage }</a>
                    </li>
                    <li className={`ant-pagination-next ${(!hasNextPage && !hasPreviousPage) && "ant-pagination-disabled"}`} onClick={ this.nextPage }>
                        <a className="ant-pagination-item-link" />
                    </li>
                </ul>
            </div>
        )
    }
}

export default TablePagination
