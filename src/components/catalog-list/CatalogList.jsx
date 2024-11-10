// src/pages/CatalogList.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

const CatalogList = ({ catalogs, onDeleteCatalog }) => {
  return (
    <div>
      <h4 className="mt-5">Каталоги :</h4>
      <ListGroup>
        {catalogs.map((catalog) => (
          <ListGroup.Item key={catalog.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{catalog.caption}</strong>
              <br />
              <img
                src={catalog.mainPhoto}
                alt={catalog.caption}
                style={{ width: '100px', marginTop: '10px' }}
              />
            </div>
            <Button
              variant="danger"
              onClick={() => onDeleteCatalog(catalog.id)}
            >
              Удалить
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CatalogList;
