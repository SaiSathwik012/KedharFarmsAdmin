"use client";

import React, { createContext, useContext } from "react";
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";
import { Label } from "./label";

const Form = FormProvider;

const FormFieldContext = createContext({});
const FormItemContext = createContext({});

function FormField(props) {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
}

function useFormField() {
    const fieldContext = useContext(FormFieldContext);
    const itemContext = useContext(FormItemContext);
    const { getFieldState } = useFormContext();
    const formState = useFormState({ name: fieldContext.name });
    const fieldState = getFieldState(fieldContext.name, formState);

    return {
        id: itemContext.id,
        name: fieldContext.name,
        ...fieldState,
    };
}

function FormItem({ className, ...props }) {
    const id = React.useId();
    return (
        <FormItemContext.Provider value={{ id }}>
            <div className={cn("grid gap-2", className)} {...props} />
        </FormItemContext.Provider>
    );
}

function FormLabel({ className, ...props }) {
    return <Label className={cn(className)} {...props} />;
}

function FormControl(props) {
    return <Slot {...props} />;
}

function FormDescription({ className, ...props }) {
    return <p className={cn("text-sm text-gray-500", className)} {...props} />;
}

function FormMessage({ className, children, ...props }) {
    if (!children) return null;
    return (
        <p className={cn("text-sm text-red-600", className)} {...props}>
            {children}
        </p>
    );
}

export {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    useFormField,
};
