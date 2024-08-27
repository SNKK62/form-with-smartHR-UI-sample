import React from "react";
import {
  createTheme,
  ThemeProvider,
  Button,
  FormControl,
  Input,
  Textarea,
} from "smarthr-ui";
import styled from "styled-components";
import "smarthr-ui/smarthr-ui.css";
import { useForm, SubmitHandler } from "react-hook-form";

const theme = createTheme();

const RequiredLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <span style={{ color: "red" }}> *</span>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

type InputType = {
  name: string;
  requiredText: string;
};

const App: React.FC = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = (data) => console.log(data);

  // console.log(watch("name")); // watch input value by passing the name of it

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        {/* /* "handleSubmit" will validate your inputs before invoking "onSubmit"
         */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            title="Name"
            labelId="name"
            errorMessages={errors.name?.message}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <Input
              defaultValue="Your Name"
              id="name"
              {...register("name", {
                maxLength: {
                  value: 10,
                  message: "This input exceed maxLength.",
                },
              })}
              error={!!errors.name}
            />
          </FormControl>
          <FormControl
            title={<RequiredLabel>Required Text</RequiredLabel>}
            labelId="requiredText"
            errorMessages={errors.requiredText?.message}
          >
            {/* include validation with required or other standard HTML validation rules */}
            <Textarea
              {...register("requiredText", {
                required: "This field is required.",
              })}
              id="requiredText"
              cols={35}
              rows={3}
              maxRows={10}
              autoResize
              error={!!errors.requiredText}
            />
          </FormControl>
          <Button variant="primary" type="submit">
            Hello World
          </Button>
        </form>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
