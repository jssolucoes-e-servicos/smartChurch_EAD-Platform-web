import {
  Pagination, PaginationItem, PaginationLink
} from "reactstrap";

export default function PaginationComponent(props:any) {
  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled>
        <PaginationLink
          first
          href="#"
        />
      </PaginationItem>
      <PaginationItem disabled>
        <PaginationLink
          href="#"
          previous
        />
      </PaginationItem>
      <PaginationItem active>
        <PaginationLink href="#">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem disabled>
        <PaginationLink href="#">
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">
          5
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          next
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          last
        />
      </PaginationItem>
    </Pagination>
  );
}