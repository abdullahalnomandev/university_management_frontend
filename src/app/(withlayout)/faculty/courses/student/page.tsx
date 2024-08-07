"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";
import { IOfferedCourseSection } from "@/types";
import { useFacultyCourseStudentsQuery } from "@/redux/api/facultyApi";

const FacultyCoursesStudentPage = ({ searchParams }: Record<string, any>) => {

    const { courseId, offeredCourseSectionId } = searchParams;

    const query: Record<string, any> = {};
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    query["limit"] = size;
    query["page"] = page;
    query["sortBy"] = sortBy;
    query["sortOrder"] = sortOrder;

    if (!!courseId) {
        query["courseId"] = courseId;
    }
    if (!!offeredCourseSectionId) {
        query["offeredCourseSectionId"] = offeredCourseSectionId;
    }

    const debouncedSearchTerm = useDebounced({
        searchQuery: searchTerm,
        delay: 600,
    });

    if (!!debouncedSearchTerm) {
        query["searchTerm"] = debouncedSearchTerm;
    }
    const { data, isLoading } = useFacultyCourseStudentsQuery({ ...query });

    console.log('data', data)
    const myCourseStudents = data?.myCourseStudents;
    const meta = data?.meta;

    // console.log(myCourses);

    const columns = [
        {
            title: "Student name",
            render: function (data: any) {
                return <>
                    {data?.firstName}
                    {data?.middleName}
                    {data?.lastName}
                </>;
            },
        },
        {
            title: "Student ID",
            dataIndex: "studentId",
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Contact No.",
            dataIndex: "contactNo"

        },

        {
            title: "Action",
            render: function (data: any,i:number) {
                return (
                    <div key={i}>
                        <Link href={`/faculty/student-result?studentId=${data.id}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`} >
                        <Button type="primary">View Marks</Button>
                        </Link>
                    </div>
                );
            },
        },
    ];
    const onPaginationChange = (page: number, pageSize: number) => {
        console.log("Page:", page, "PageSize:", pageSize);
        setPage(page);
        setSize(pageSize);
    };
    const onTableChange = (pagination: any, filter: any, sorter: any) => {
        const { order, field } = sorter;
        // console.log(order, field);
        setSortBy(field as string);
        setSortOrder(order === "ascend" ? "asc" : "desc");
    };

    const resetFilters = () => {
        setSortBy("");
        setSortOrder("");
        setSearchTerm("");
    };
    return (
        <div>
            <UMBreadCrumb
                items={[
                    {
                        label: "faculty",
                        link: "/faculty",
                    },
                    {
                        label: "courses",
                        link: "/faculty/courses",
                    }
                ]}
            />
            <ActionBar title="My Courses Students">
                <Input
                    size="large"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "20%",
                    }}
                />
                <div>
                    {(!!sortBy || !!sortOrder || !!searchTerm) && (
                        <Button
                            style={{ margin: "0px 5px" }}
                            type="primary"
                            onClick={resetFilters}
                        >
                            <ReloadOutlined />
                        </Button>
                    )}
                </div>
            </ActionBar>

            <UMTable
                loading={isLoading}
                columns={columns}
                dataSource={myCourseStudents}
                pageSize={size}
                totalPages={meta?.total}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                onTableChange={onTableChange}
                showPagination={true}
            />
        </div>
    );
};

export default FacultyCoursesStudentPage;
