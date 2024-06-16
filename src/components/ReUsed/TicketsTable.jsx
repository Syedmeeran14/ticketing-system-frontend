import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../hooks/FormatDate';

function TicketsTable({ tickets }) {
  let navigate = useNavigate();

  return tickets.length ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>TN</th>
          <th>Name</th>
          <th>Email</th>
          <th>Title</th>
          <th>CreatedAt</th>
          <th>Status</th>
          <th>View</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((e, i) => (
          <tr key={i}>
            <td>{e.tn}</td>
            <td>{e.studentName}</td>
            <td>{e.studentEmail}</td>
            <td>{e.title}</td>
            <td>{formatDate(e.createdAt)}</td>
            <td>{e.status}</td>
            <td>
              <Button variant='primary' onClick={() => navigate(`/tickets/${e._id}`)}>View</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <h3 style={{ textAlign: 'center' }}>No Tickets Available</h3>
  );
}

export default TicketsTable;