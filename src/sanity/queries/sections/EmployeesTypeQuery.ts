import groq from "groq";
import { ImageQuery } from "../atoms/ImageQuery";

const Manual = groq` 
view == "manual" => employees[]->{
  title,
  _createdAt,
  "employeePosition": {
    "stilling": employeePosition.stilling[]->{
      _updatedAt, _createdAt, _rev, _type, _id, title
    }
  },
  socials[] {
    platform,
    url
  },
  email,
  image {
        ${ImageQuery},
      },  _type,
  phone,
  _rev,
  _id,
  _updatedAt
}
`;
const Department = groq`
"department": department[]->{
    ...,
    "employees": *[_type == "employee" && references(^._id)] {
      title,
      _createdAt,
      "employeePosition": {
        "stilling": employeePosition.stilling[]->{
          _updatedAt, _createdAt, _rev, _type, _id, title
        }
      },
      socials[] {
        platform,
        url
      },
      email,
      image {
        ${ImageQuery},
      },
      _type,
      phone,
      _rev,
      _id,
      _updatedAt
    }
}
  `;

const All = groq`
  view == "all" => *[_type == "employee"] {
    title,
    _createdAt,
    "employeePosition": {
      "stilling": employeePosition.stilling[]->{
        _updatedAt, _createdAt, _rev, _type, _id, title
      }
    },
    socials[] {
      platform,
      url
    },
    email,
    image {
        ${ImageQuery},
      },    _type,
    phone,
    _rev,
    _id,
    _updatedAt
  }
`;

export const EmployeesTypeQuery = groq`
  _type == "EmployeesType" => {
    "departmentTitle": department[0]->title,
    ...,
    "employees": select(
      ${Manual},
      ${All}
    ),
      ${Department},
  }
`;
