"use client"
import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import { acDepartmentOptions, acSemesterOptions, departmentOptions, facultyOptions, genderOptions } from "@/constants/global";
import UploadImage from '@/components/ui/UploadImage';
import ACDepartmentField from "../Forms/ACDepartmentField";
import ACFacultyField from "../Forms/ACFacultyField";
import ACSemesterField from "../Forms/ACSemesterField";

const StudentInfo = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "5px"
      }}
    >

      <Row gutter={{ xs: 8, sm: 8 }}>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.name.firstName"
            size="large"
            label="First Name"
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.name.middleName"
            size="large"
            label="Middle Name"
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="text"
            name="student.name.lastName"
            size="large"
            label="Last Name"
          />
        </Col>
        <Col className="gutter-row" span={6} style={{ marginBottom: "10px" }}>
          <FormInput
            type="password"
            name="password"
            size="large"
            label="Password"
          />
        </Col>
        <Col className="gutter-row" span={8} style={{ marginBottom: "10px" }}>
          <ACDepartmentField name="student.academicDepartment" label="Academic Department"
          />
        </Col>
        <Col className="gutter-row" span={8} style={{ marginBottom: "10px" }}>
          <ACFacultyField name="student.academicFaculty" label="Academic Faculty"
          />
        </Col>
        <Col className="gutter-row" span={8} style={{ marginBottom: "10px" }}>
          <ACSemesterField name="student.academicSemester"
            label="Academic Semester"
          />
        </Col>
        <Col className="gutter-row" span={8} style={{ marginBottom: "10px" }}>
          <FormSelectField
            name="student.gender"
            options={genderOptions}
            size="large"
            label="Gender"
            placeholder="Select"
          />
        </Col>
        <Col className="gutter-row" span={8} style={{ marginBottom: "10px" }}>
          <UploadImage name="file" />
        </Col>

      </Row>
    </div>
  );
};

export default StudentInfo;