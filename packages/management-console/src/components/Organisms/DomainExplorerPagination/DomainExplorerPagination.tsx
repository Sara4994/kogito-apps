import React, { useState } from 'react';
import { Pagination, PaginationVariant } from '@patternfly/react-core';

const DomainExplorerPagination = () => {
  const [page, setPate] = useState(1);
  const [perPage, setPerpage] = useState(20);

  const onSetPage = (_event, pageNumber) => {
    this.setState({
      page: pageNumber
    });
  };

  const onPerPageSelect = (_event, _perPage) => {
    this.setState({
      _perPage
    });
  };

  return (
    <Pagination
      itemCount={523}
      perPage={perPage}
      page={page}
      onSetPage={onSetPage}
      widgetId="pagination-options-menu-top"
      onPerPageSelect={onPerPageSelect}
    />
  );
};

export default DomainExplorerPagination;
