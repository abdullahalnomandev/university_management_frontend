import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";
import { useAcademicSemestersQuery } from "@/redux/api/academic/semesterApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const ACSemesterField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useAcademicSemestersQuery({
    limit: 100,
    page: 1,
  });
  const academicSemesters = data?.academicSemesters;
  const acSemesterOptions = academicSemesters?.map((acSemester) => {
    return {
      label: acSemester?.title + "-" + acSemester?.year,
      value: acSemester?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acSemesterOptions as SelectOptions[]}
      placeholder=""
    />
  );
};

export default ACSemesterField;