import React, { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className = "" }: TableProps) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full caption-bottom text-sm">
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return (
    <thead className={`border-b bg-muted/50 ${className}`}>
      {children}
    </thead>
  );
}

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className = "" }: TableBodyProps) {
  return (
    <tbody className={`${className}`}>
      {children}
    </tbody>
  );
}

interface TableRowProps {
  children: ReactNode;
  className?: string;
}

export function TableRow({ children, className = "" }: TableRowProps) {
  return (
    <tr className={`border-b transition-colors hover:bg-muted/50 ${className}`}>
      {children}
    </tr>
  );
}

interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
}

export function TableHead({ children, className = "", ...props }: TableHeadProps) {
  return (
    <th 
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
  className?: string;
}

export function TableCell({ children, className = "", ...props }: TableCellProps) {
  return (
    <td 
      className={`p-4 align-middle ${className}`}
      {...props}
    >
      {children}
    </td>
  );
} 