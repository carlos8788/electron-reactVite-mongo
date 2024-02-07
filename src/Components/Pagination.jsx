const Pagination = ({ currentPage, setCurrentPage, totalUsers, usersPerPage }) => {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    const pageNumbers = [];
  
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);
  
    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
  
    return (
      <ol className="flex justify-center gap-1 text-xs font-medium mt-4">
        {pageNumbers.map((page, index) => (
          <li key={index}>
            <a
              onClick={() => page !== '...' && setCurrentPage(page)}
              className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 w-8 cursor-pointer
                ${currentPage === page ? 'bg-green-900 text-white' : 'bg-green-500 text-neutral-600 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'}
                ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {page}
            </a>
          </li>
        ))}
      </ol>
    );
  };

  
export default Pagination