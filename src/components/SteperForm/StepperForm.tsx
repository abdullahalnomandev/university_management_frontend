"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Steps } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import { useRouter } from "next/navigation";

interface ISteps {
  title?: string;
  content?: React.ReactElement | React.ReactNode;
}

interface IProps {
  submitHandler: (el: any) => void;
  navigateLink?: string;
  steps: ISteps[];
  persistkey:string;
}

const StepperForm: React.FC<IProps> = ({
  steps,
  persistkey,
  submitHandler,
  navigateLink
}) => {
  const router = useRouter();
  const [current, setCurrent] = useState<number>(!!getFromLocalStorage("step")? Number(JSON.parse(getFromLocalStorage("step") as string).step): 0
  );

  const [savedValues, setSavedValues] = useState(!!getFromLocalStorage(persistkey)? 
  (JSON.parse(getFromLocalStorage(persistkey) as string)): ''
  );

  useEffect(() => {
    setToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const methods = useForm({defaultValues:savedValues});
  const watch = methods.watch()

  useEffect(() => {
    setToLocalStorage(persistkey, JSON.stringify(watch));
  }, [watch,persistkey,methods]);


  const { handleSubmit, reset } = methods;

  const handleStudentOnSubmit = (data: any) => {
    submitHandler(data);
    reset();
    setToLocalStorage("step", JSON.stringify({ step: 0 }));
    setToLocalStorage(persistkey, JSON.stringify(watch));
    navigateLink && router.push(navigateLink);
  };

  return (
    <>
      <Steps current={current} items={items} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentOnSubmit)}>
          <div>{steps[current]?.content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
