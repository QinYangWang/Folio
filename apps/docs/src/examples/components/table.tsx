"use client";

import { Table, TableHeader, Column, TableBody, Row, Cell } from "@/ui/table";

export default function Example() {
  return (
    <Table aria-label="Team members" selectionMode="single">
      <TableHeader>
        <Column isRowHeader>Name</Column>
        <Column>Role</Column>
        <Column>Status</Column>
      </TableHeader>
      <TableBody>
        <Row id="jane">
          <Cell>Jane Doe</Cell>
          <Cell>Designer</Cell>
          <Cell>Active</Cell>
        </Row>
        <Row id="alex">
          <Cell>Alex Kim</Cell>
          <Cell>Engineer</Cell>
          <Cell>Active</Cell>
        </Row>
      </TableBody>
    </Table>
  );
}
