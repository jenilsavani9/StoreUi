import React from 'react'

function Pagination({ setPageIndex, pageIndex, userCount }) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item me-2">
                    <a className="page-link btn text-dark" onClick={() => { (pageIndex - 1) < 0 ? setPageIndex(pageIndex) : setPageIndex(pageIndex - 1) }} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {Array.from({ length: (userCount / 10) + 1 }, (_, index) => index + 1).map((i, index) => {
                    return <li key={index} className="page-item me-2 "><a className="page-link btn text-dark" onClick={() => setPageIndex(i - 1)}>{i}</a></li>
                })}

                <li className="page-item ">
                    <a className="page-link btn text-dark" onClick={() => { (pageIndex + 1) > userCount / 10 ? setPageIndex(pageIndex) : setPageIndex(pageIndex + 1) }} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination