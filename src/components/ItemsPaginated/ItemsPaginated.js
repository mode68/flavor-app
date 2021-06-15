import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const ItemsPaginated = ({ items, itemsPerPage, containerStyle, paginationControlsStyle }) => {
	const [pageNumber, setPageNumber] = useState(0);
	const pagesVisited = pageNumber * itemsPerPage;

	const itemsDisplayed = items.slice(pagesVisited, pagesVisited + itemsPerPage);

	const pageCount = Math.ceil(items.length / itemsPerPage);

	const changePage = (data) => {
		const selected = data.selected;
		setPageNumber(selected);
	};
	return (
		<div className={containerStyle}>
			{itemsDisplayed}
			<div className={paginationControlsStyle}>
				<ReactPaginate
					previousLabel={'Previous'}
					nextLabel={'Next'}
					pageCount={pageCount}
					onPageChange={changePage}
					breakClassName={'page-item'}
					breakLinkClassName={'page-link'}
					containerClassName={'pagination'}
					pageClassName={'page-item'}
					pageLinkClassName={'page-link'}
					previousClassName={'page-item'}
					previousLinkClassName={'page-link'}
					nextClassName={'page-item'}
					nextLinkClassName={'page-link'}
					activeClassName={'active'}
				/>
			</div>
		</div>
	);
};

export default ItemsPaginated;
