import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField
} from "@mui/material";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller
} from "react-hook-form";
import axios from "axios";

const steps = [
  "Basic Information",
  "Contact Information",
  "Personal Information",
  "Payment"
];

export default function LinearStepper() {
  const [boxStep, setBoxStep] = useState(0);
  const [skippedStep, setSkippedStep] = useState([]);
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhone: "",
      address1: "",
      address2: "",
      country: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: ""
    }
  });
  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepFailed = () => {
    return Boolean(Object.keys(methods.formState.errors).length)
  };

  const handleNext = async (data) => {
    if (boxStep === steps.length - 1) {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        data
      );
      console.log(res.data);
      setBoxStep(boxStep + 1);
    } else {
      setBoxStep(boxStep + 1);
      setSkippedStep(skippedStep.filter((item) => item !== boxStep));
    }
  };

  const handleBack = () => {
    setBoxStep(boxStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(boxStep)) {
      setSkippedStep([...skippedStep, boxStep]);
    }
    setBoxStep(boxStep + 1);
  };

  const isStepSkipped = (step) => {
    return skippedStep.includes(step);
  };

  const BasicInformation = () => {
    const { control,formState:{errors} } = useFormContext();
    return (
      <>
        <Controller
          control={control}
          name="firstName"
          rules={{
            required:"firstName is required",
          }}
          render={({ field }) => (
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              placeholder="Enter Your First Name"
              fullWidth
              margin="normal"
              {...field}
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{
            required:"lastName is required",
          }}
          render={({ field }) => (
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              placeholder="Enter Your Last Name"
              fullWidth
              margin="normal"
              {...field}
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="nickName"
          rules={{
            required:"nickName is required",
          }}
          render={({ field }) => (
            <TextField
              id="nick-name"
              label="Nick Name"
              variant="outlined"
              placeholder="Enter Your Nick Name"
              fullWidth
              margin="normal"
              {...field}
              error={Boolean(errors.nickName)}
              helperText={errors.nickName?.message}
            />
          )}
        />
      </>
    );
  };
  const ContactInformation = () => {
    const { control } = useFormContext();

    return (
      <>
        <Controller
          control={control}
          name="emailAddress"
          render={({ field }) => (
            <TextField
              id="email"
              label="E-mail"
              variant="outlined"
              placeholder="Enter Your E-mail Address"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <TextField
              id="phone-number"
              label="Phone Number"
              variant="outlined"
              placeholder="Enter Your Phone Number"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="alternatePhone"
          render={({ field }) => (
            <TextField
              id="alternate-phone"
              label="Alternate Phone"
              variant="outlined"
              placeholder="Enter Your Alternate Phone"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };
  const PersonalInformation = () => {
    const { control } = useFormContext();

    return (
      <>
        <Controller
          control={control}
          name="address1"
          render={({ field }) => (
            <TextField
              id="address1"
              label="Address 1"
              variant="outlined"
              placeholder="Enter Your Address 1"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="address2"
          render={({ field }) => (
            <TextField
              id="address2"
              label="Address 2"
              variant="outlined"
              placeholder="Enter Your Address 2"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <TextField
              id="country"
              label="Country"
              variant="outlined"
              placeholder="Enter Your Country Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };
  const PaymentInformation = () => {
    const { control } = useFormContext();

    return (
      <>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field }) => (
            <TextField
              id="cardNumber"
              label="Card Number"
              variant="outlined"
              placeholder="Enter Your Card Number"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="cardMonth"
          render={({ field }) => (
            <TextField
              id="cardMonth"
              label="Card Month"
              variant="outlined"
              placeholder="Enter Your Card Month"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
          handleSubmit
        />
        <Controller
          control={control}
          name="cardYear"
          render={({ field }) => (
            <TextField
              id="cardYear"
              label="Card Year"
              variant="outlined"
              placeholder="Enter Your Card Year"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    );
  };

  const getContent = (step) => {
    switch (step) {
      case 0:
        return <BasicInformation />;
      case 1:
        return <ContactInformation />;
      case 2:
        return <PersonalInformation />;
      case 3:
        return <PaymentInformation />;
      default:
        return;
    }
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper alternativeLabel activeStep={boxStep}>
        {steps.map((label, index) => {
          const labelProps = {};
          const skipSteps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                style={{ display: "block", textAlign: "center" }}
                color="primary"
              >
                optional
              </Typography>
            );
          }
           if(isStepFailed() && boxStep===index){
             labelProps.error=true
           }
          if (isStepSkipped(index)) {
            skipSteps.completed = false;
          }

          return (
            <Step {...skipSteps} key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {boxStep >= steps.length ? (
        <Typography mt={5} variant="h3" align="center">
          Thank You
        </Typography>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getContent(boxStep)}
              <Button
                style={{ margin: "0 10px" }}
                disabled={boxStep === 0}
                onClick={handleBack}
                variant="contained"
              >
                Back
              </Button>
              {isStepOptional(boxStep) && (
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={handleSkip}
                  variant="contained"
                >
                  Skip
                </Button>
              )}
              <Button
                type="submit"
                //  onClick={handleNext}
                variant="contained"
              >
                {boxStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </Box>
  );
}
