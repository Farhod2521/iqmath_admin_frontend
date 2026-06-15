import React from "react";
import { Link } from "react-router-dom";
export type BreadcrumbItem = {
  title: string;
  link?: string;
};

type Props = {
  data: BreadcrumbItem[];
};

const BaseBreadcrumbs: React.FC<Props> = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="mb-2">
      <nav className="flex items-center text-sm text-gray-500">
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            {idx !== 0 && <span className="mx-2 text-gray-300">/</span>}

            {item.link ? (
              <Link to={item.link} className="font-medium hover:text-blue-600">
                {item.title}
              </Link>
            ) : (
              <span className="text-gray-900 font-semibold">{item.title}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default BaseBreadcrumbs;
