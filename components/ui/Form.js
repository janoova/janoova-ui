"use client";
import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import parse from "html-react-parser";
import styled from "styled-components";
import Button from "./Button";
import { stegaClean } from "@sanity/client/stega";
import { checkValidJS } from "@/lib/helpers";
import { usePathname } from "next/navigation";
import { baseUrl } from "@/lib/constants";
import Select from "react-select";
import { useId } from "react";

const Component = styled.div`
  .c {
    &__form {
      &__fields-wrapper {
        display: flex;
        flex-wrap: wrap;
        margin-left: -6px;
        margin-right: -6px;
      }
      &__fieldset {
        width: 100%;
        margin-bottom: 1rem;
        padding-left: 6px;
        padding-right: 6px;
        &--50 {
          @media (min-width: 500px) {
            max-width: 50%;
            flex: 0 0 50%;
          }
        }
        &--hidden {
          display: none;
        }
      }
      &__error {
        color: var(--t-cp-error-400);
        margin-top: 0.25rem;
        font-size: 0.8rem;
      }
      &__input {
        &--error {
          border-color: var(--t-cp-error-400) !important;
          &:focus {
            border: 1px solid var(--t-cp-error-400) !important;
            box-shadow:
              0px 1px 2px rgba(16, 24, 40, 0.05),
              0px 0px 0px 4px var(--t-cp-error-50) !important;
          }
        }
      }
      &__message {
        margin-top: 1.5rem;
        text-align: center;
        padding: 0.75rem;
        border-radius: 8px;
        > :last-child {
          margin-bottom: 0;
        }
        &--success {
          background-color: var(--t-cp-success-100);
          border: 1px solid var(--t-cp-success-400);
        }
        &--error {
          background-color: var(--t-cp-error-50);
          border: 1px solid var(--t-cp-error-400);
        }
      }
      &__select {
        padding: 5px 8px !important;
        .select {
          &__control {
            border: none;
            min-height: 0;
            box-shadow: none !important;
          }
          &__value-container {
            padding: 0;
          }
          &__input-container,
          &__input {
            border: none !important;
            box-shadow: none !important;
            outline: none !important;
          }
          &__multi-value {
            background-color: #eee;
            border-radius: 8px;
            &__remove {
              position: relative;
              top: 0.5px;
              &:hover {
                background: unset;
                color: unset;
              }
            }
          }
          &__menu {
            left: 0;
            border-radius: var(--t-form-input-border-radius);
          }
          &__option {
            &:active {
              background-color: var(--t-form-select-selected-color);
            }
            &--is {
              &-focused {
                background-color: var(--t-form-select-selected-color);
              }
              &-selected {
                background-color: var(--t-form-select-selected-color);
                color: var(--t-body-color);
              }
            }
          }
        }
      }
    }
  }
  form {
    label {
      color: var(--t-form-label-color);
      margin-bottom: 0.35rem;
      display: block;
      font-size: 0.85rem;
    }
    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="tel"],
    input[type="number"],
    input[type="file"],
    select,
    .c__form__select,
    textarea {
      color: var(--t-body-color);
      border: 1px solid var(--t-form-input-border-color);
      outline: none;
      border-radius: var(--t-form-input-border-radius);
      transition: 0.2s ease;
      box-shadow: var(--t-form-input-box-shadow);
      padding: 0.65rem 0.75rem;
      width: 100%;
      font-size: 0.95rem;
      background-color: var(--t-cp-base-white);
      &:focus,
      &:focus-within,
      &:focus-visible {
        border-color: var(--t-form-input-focus-border-color);
        box-shadow: var(--t-form-input-focus-box-shadow);
        outline: none;
        transition: 0.2s ease;
      }
    }
    ::-webkit-input-placeholder,
    ::-moz-placeholder,
    :-ms-input-placeholder,
    :-moz-placeholder,
    ::placeholder {
      color: var(--t-form-placeholder-color);
    }
    select {
      -webkit-appearance: none;
      appearance: none;
      -moz-appearance: none;
      background-image: url(https://23219927.fs1.hubspotusercontent-na1.net/hubfs/23219927/chev-down.svg);
      background-repeat: no-repeat;
      background-size: 13px;
      background-position: 97% 50%;
      background-color: transparent;
      @media (min-width: 768px) {
        background-position: 98% 50%;
      }
    }
    textarea {
      min-height: 120px;
    }
  }
`;

// Field components without React.memo to allow proper re-registration
const TextAreaField = ({ field, register, error }) => (
  <textarea
    className={`c__form__input ${error ? "c__form__input--error" : ""}`}
    name={field.name}
    placeholder={field.placeholder}
    defaultValue={field.defaultValue || ""}
    {...register(field.name, {
      required: field.required?.message || field.required,
      pattern: field.pattern || null,
    })}
  />
);

const SelectField = ({ field, control, error }) => {
  const generatedId = useId();

  return (
    <Controller
      name={field.name}
      control={control}
      rules={{
        required: field.required?.message || field.required,
        pattern: field.pattern || null,
      }}
      defaultValue={field.defaultValue || null}
      render={({ field: controllerField }) => (
        <Select
          {...controllerField}
          instanceId={generatedId}
          name={field.name}
          className={`basic-multi-select c__form__select ${error ? "c__form__input--error" : ""}`}
          classNamePrefix="select"
          options={field.options}
          placeholder={field.placeholder}
          isMulti={field.isMulti}
          closeMenuOnSelect={!field.isMulti}
          onChange={controllerField.onChange}
          onBlur={controllerField.onBlur}
          value={controllerField.value ?? (field.isMulti ? [] : null)}
        />
      )}
    />
  );
};

const InputField = ({ field, register, error }) => (
  <input
    className={`c__form__input ${error ? "c__form__input--error" : ""}`}
    name={field.name}
    type={field.type}
    placeholder={field.placeholder}
    defaultValue={field.defaultValue || ""}
    {...register(field.name, {
      required: field.required?.message || field.required,
      pattern: field.pattern || null,
    })}
  />
);

const FormField = ({ field, register, control, error }) => {
  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          <TextAreaField field={field} register={register} error={error} />
        );
      case "select":
        return <SelectField field={field} control={control} error={error} />;
      default:
        return <InputField field={field} register={register} error={error} />;
    }
  };

  return (
    <div
      className={`c__form__fieldset c__form__fieldset--${field.width} ${
        field.type === "hidden" ? "c__form__fieldset--hidden" : ""
      }`}
    >
      <div className="c__form__field">
        {field.label && (
          <label className="c__form__label" htmlFor={field.name}>
            {field.label}
          </label>
        )}
        <div className="c__form__input-wrapper">{renderInput()}</div>
      </div>
      {error && (
        <div id={`${field.name}-error`} className="c__form__error">
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

const Form = ({
  formFields,
  register,
  control,
  errors,
  isValid,
  onSubmit,
  payloadPosting,
  formMessage,
  buttonTitle = "Get Started",
  includeHoneypot,
}) => {
  const pathname = usePathname();

  // Memoize form fields parsing to avoid re-parsing on every render
  const parsedFormFields = useMemo(() => {
    if (!formFields) return null;

    const cleanedFields = stegaClean(`${formFields}`);

    try {
      return checkValidJS(`return ${cleanedFields}`)
        ? new Function(`return ${cleanedFields}`)()
        : null;
    } catch (error) {
      console.error("Error parsing form fields:", error);
      return null;
    }
  }, [formFields]);

  // Early return if no valid form fields
  if (!parsedFormFields || !Array.isArray(parsedFormFields)) {
    return (
      <Component className="c__form">
        <div className="c__form__message c__form__message--error">
          Error rendering the form. <br />
          Please check form fields are set up correctly
        </div>
      </Component>
    );
  }

  return (
    <Component className="c__form">
      <form onSubmit={onSubmit} autoComplete="off">
        <input
          type="hidden"
          value={`${baseUrl}${pathname}`}
          {...register("page_url")}
        />
        {includeHoneypot && (
          <input
            type="checkbox"
            name="_honeypot"
            style={{ display: `none` }}
            tabIndex="-1"
            autoComplete="off"
            {...register("_honeypot")}
          />
        )}

        <div className="c__form__fields-wrapper">
          {parsedFormFields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              register={register}
              control={control}
              error={errors[field.name]}
            />
          ))}
        </div>

        <div className="c__form__button-wrapper">
          <Button
            actionable
            title={buttonTitle}
            type="submit"
            isLoading={payloadPosting}
            // isDisabled={!isValid}
          />
        </div>

        {formMessage && (
          <div
            className={`c__form__message c__form__message--${formMessage.type}`}
          >
            {parse(formMessage.message)}
          </div>
        )}
      </form>
    </Component>
  );
};

// Set display names for better debugging
TextAreaField.displayName = "TextAreaField";
SelectField.displayName = "SelectField";
InputField.displayName = "InputField";
FormField.displayName = "FormField";

export default Form;
