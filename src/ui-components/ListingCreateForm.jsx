/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Autocomplete,
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { listRecruiters, listUpdates } from "../graphql/queries";
import { createListing, updateUpdate } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ListingCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    company: "",
    title: "",
    source: "",
    link: "",
    recruiter: undefined,
    status: "",
    notes: "",
    updates: [],
    updateIds: [],
  };
  const [company, setCompany] = React.useState(initialValues.company);
  const [title, setTitle] = React.useState(initialValues.title);
  const [source, setSource] = React.useState(initialValues.source);
  const [link, setLink] = React.useState(initialValues.link);
  const [recruiter, setRecruiter] = React.useState(initialValues.recruiter);
  const [recruiterLoading, setRecruiterLoading] = React.useState(false);
  const [recruiterRecords, setRecruiterRecords] = React.useState([]);
  const [status, setStatus] = React.useState(initialValues.status);
  const [notes, setNotes] = React.useState(initialValues.notes);
  const [updates, setUpdates] = React.useState(initialValues.updates);
  const [updatesLoading, setUpdatesLoading] = React.useState(false);
  const [updatesRecords, setUpdatesRecords] = React.useState([]);
  const [updateIds, setUpdateIds] = React.useState(initialValues.updateIds);
  const autocompleteLength = 10;
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCompany(initialValues.company);
    setTitle(initialValues.title);
    setSource(initialValues.source);
    setLink(initialValues.link);
    setRecruiter(initialValues.recruiter);
    setCurrentRecruiterValue(undefined);
    setCurrentRecruiterDisplayValue("");
    setStatus(initialValues.status);
    setNotes(initialValues.notes);
    setUpdates(initialValues.updates);
    setCurrentUpdatesValue(undefined);
    setCurrentUpdatesDisplayValue("");
    setUpdateIds(initialValues.updateIds);
    setCurrentUpdateIdsValue("");
    setErrors({});
  };
  const [currentRecruiterDisplayValue, setCurrentRecruiterDisplayValue] =
    React.useState("");
  const [currentRecruiterValue, setCurrentRecruiterValue] =
    React.useState(undefined);
  const recruiterRef = React.createRef();
  const [currentUpdatesDisplayValue, setCurrentUpdatesDisplayValue] =
    React.useState("");
  const [currentUpdatesValue, setCurrentUpdatesValue] =
    React.useState(undefined);
  const updatesRef = React.createRef();
  const [currentUpdateIdsValue, setCurrentUpdateIdsValue] = React.useState("");
  const updateIdsRef = React.createRef();
  const getIDValue = {
    recruiter: (r) => JSON.stringify({ id: r?.id }),
    updates: (r) => JSON.stringify({ id: r?.id }),
  };
  const recruiterIdSet = new Set(
    Array.isArray(recruiter)
      ? recruiter.map((r) => getIDValue.recruiter?.(r))
      : getIDValue.recruiter?.(recruiter)
  );
  const updatesIdSet = new Set(
    Array.isArray(updates)
      ? updates.map((r) => getIDValue.updates?.(r))
      : getIDValue.updates?.(updates)
  );
  const getDisplayValue = {
    recruiter: (r) => `${r?.listingId}${r?.email}`,
    updates: (r) => `${r?.notes ? r?.notes + " - " : ""}${r?.id}`,
  };
  const validations = {
    company: [{ type: "Required" }],
    title: [{ type: "Required" }],
    source: [],
    link: [],
    recruiter: [],
    status: [],
    notes: [],
    updates: [],
    updateIds: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const fetchRecruiterRecords = async (value) => {
    setRecruiterLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [
            { listingId: { contains: value } },
            { email: { contains: value } },
          ],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listRecruiters.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listRecruiters?.items;
      var loaded = result.filter(
        (item) => !recruiterIdSet.has(getIDValue.recruiter?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setRecruiterRecords(newOptions.slice(0, autocompleteLength));
    setRecruiterLoading(false);
  };
  const fetchUpdatesRecords = async (value) => {
    setUpdatesLoading(true);
    const newOptions = [];
    let newNext = "";
    while (newOptions.length < autocompleteLength && newNext != null) {
      const variables = {
        limit: autocompleteLength * 5,
        filter: {
          or: [{ notes: { contains: value } }, { id: { contains: value } }],
        },
      };
      if (newNext) {
        variables["nextToken"] = newNext;
      }
      const result = (
        await client.graphql({
          query: listUpdates.replaceAll("__typename", ""),
          variables,
        })
      )?.data?.listUpdates?.items;
      var loaded = result.filter(
        (item) => !updatesIdSet.has(getIDValue.updates?.(item))
      );
      newOptions.push(...loaded);
      newNext = result.nextToken;
    }
    setUpdatesRecords(newOptions.slice(0, autocompleteLength));
    setUpdatesLoading(false);
  };
  React.useEffect(() => {
    fetchRecruiterRecords("");
    fetchUpdatesRecords("");
  }, []);
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          company,
          title,
          source,
          link,
          recruiter,
          status,
          notes,
          updates,
          updateIds,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(
                    fieldName,
                    item,
                    getDisplayValue[fieldName]
                  )
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(
                fieldName,
                modelFields[fieldName],
                getDisplayValue[fieldName]
              )
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          const modelFieldsToSave = {
            company: modelFields.company,
            title: modelFields.title,
            source: modelFields.source,
            link: modelFields.link,
            recruiterId: modelFields?.recruiter?.id,
            status: modelFields.status,
            notes: modelFields.notes,
            updateIds: modelFields.updateIds,
          };
          const listing = (
            await client.graphql({
              query: createListing.replaceAll("__typename", ""),
              variables: {
                input: {
                  ...modelFieldsToSave,
                },
              },
            })
          )?.data?.createListing;
          const promises = [];
          promises.push(
            ...updates.reduce((promises, original) => {
              promises.push(
                client.graphql({
                  query: updateUpdate.replaceAll("__typename", ""),
                  variables: {
                    input: {
                      id: original.id,
                    },
                  },
                })
              );
              return promises;
            }, [])
          );
          await Promise.all(promises);
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ListingCreateForm")}
      {...rest}
    >
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Company</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={company}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company: value,
              title,
              source,
              link,
              recruiter,
              status,
              notes,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.company ?? value;
          }
          if (errors.company?.hasError) {
            runValidationTasks("company", value);
          }
          setCompany(value);
        }}
        onBlur={() => runValidationTasks("company", company)}
        errorMessage={errors.company?.errorMessage}
        hasError={errors.company?.hasError}
        {...getOverrideProps(overrides, "company")}
      ></TextField>
      <TextField
        label={
          <span style={{ display: "inline-flex" }}>
            <span>Title</span>
            <span style={{ color: "red" }}>*</span>
          </span>
        }
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              title: value,
              source,
              link,
              recruiter,
              status,
              notes,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Source"
        isRequired={false}
        isReadOnly={false}
        value={source}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              title,
              source: value,
              link,
              recruiter,
              status,
              notes,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.source ?? value;
          }
          if (errors.source?.hasError) {
            runValidationTasks("source", value);
          }
          setSource(value);
        }}
        onBlur={() => runValidationTasks("source", source)}
        errorMessage={errors.source?.errorMessage}
        hasError={errors.source?.hasError}
        {...getOverrideProps(overrides, "source")}
      ></TextField>
      <TextField
        label="Link"
        isRequired={false}
        isReadOnly={false}
        value={link}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              title,
              source,
              link: value,
              recruiter,
              status,
              notes,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.link ?? value;
          }
          if (errors.link?.hasError) {
            runValidationTasks("link", value);
          }
          setLink(value);
        }}
        onBlur={() => runValidationTasks("link", link)}
        errorMessage={errors.link?.errorMessage}
        hasError={errors.link?.hasError}
        {...getOverrideProps(overrides, "link")}
      ></TextField>
      <ArrayField
        lengthLimit={1}
        onChange={async (items) => {
          let value = items[0];
          if (onChange) {
            const modelFields = {
              company,
              title,
              source,
              link,
              recruiter: value,
              status,
              notes,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.recruiter ?? value;
          }
          setRecruiter(value);
          setCurrentRecruiterValue(undefined);
          setCurrentRecruiterDisplayValue("");
        }}
        currentFieldValue={currentRecruiterValue}
        label={"Recruiter"}
        items={recruiter ? [recruiter] : []}
        hasError={errors?.recruiter?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("recruiter", currentRecruiterValue)
        }
        errorMessage={errors?.recruiter?.errorMessage}
        getBadgeText={getDisplayValue.recruiter}
        setFieldValue={(model) => {
          setCurrentRecruiterDisplayValue(
            model ? getDisplayValue.recruiter(model) : ""
          );
          setCurrentRecruiterValue(model);
        }}
        inputFieldRef={recruiterRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Recruiter"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Recruiter"
          value={currentRecruiterDisplayValue}
          options={recruiterRecords
            .filter((r) => !recruiterIdSet.has(getIDValue.recruiter?.(r)))
            .map((r) => ({
              id: getIDValue.recruiter?.(r),
              label: getDisplayValue.recruiter?.(r),
            }))}
          isLoading={recruiterLoading}
          onSelect={({ id, label }) => {
            setCurrentRecruiterValue(
              recruiterRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentRecruiterDisplayValue(label);
            runValidationTasks("recruiter", label);
          }}
          onClear={() => {
            setCurrentRecruiterDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchRecruiterRecords(value);
            if (errors.recruiter?.hasError) {
              runValidationTasks("recruiter", value);
            }
            setCurrentRecruiterDisplayValue(value);
            setCurrentRecruiterValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("recruiter", currentRecruiterDisplayValue)
          }
          errorMessage={errors.recruiter?.errorMessage}
          hasError={errors.recruiter?.hasError}
          ref={recruiterRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "recruiter")}
        ></Autocomplete>
      </ArrayField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              title,
              source,
              link,
              recruiter,
              status: value,
              notes,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Notes"
        isRequired={false}
        isReadOnly={false}
        value={notes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              company,
              title,
              source,
              link,
              recruiter,
              status,
              notes: value,
              updates,
              updateIds,
            };
            const result = onChange(modelFields);
            value = result?.notes ?? value;
          }
          if (errors.notes?.hasError) {
            runValidationTasks("notes", value);
          }
          setNotes(value);
        }}
        onBlur={() => runValidationTasks("notes", notes)}
        errorMessage={errors.notes?.errorMessage}
        hasError={errors.notes?.hasError}
        {...getOverrideProps(overrides, "notes")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              company,
              title,
              source,
              link,
              recruiter,
              status,
              notes,
              updates: values,
              updateIds,
            };
            const result = onChange(modelFields);
            values = result?.updates ?? values;
          }
          setUpdates(values);
          setCurrentUpdatesValue(undefined);
          setCurrentUpdatesDisplayValue("");
        }}
        currentFieldValue={currentUpdatesValue}
        label={"Updates"}
        items={updates}
        hasError={errors?.updates?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("updates", currentUpdatesValue)
        }
        errorMessage={errors?.updates?.errorMessage}
        getBadgeText={getDisplayValue.updates}
        setFieldValue={(model) => {
          setCurrentUpdatesDisplayValue(
            model ? getDisplayValue.updates(model) : ""
          );
          setCurrentUpdatesValue(model);
        }}
        inputFieldRef={updatesRef}
        defaultFieldValue={""}
      >
        <Autocomplete
          label="Updates"
          isRequired={false}
          isReadOnly={false}
          placeholder="Search Update"
          value={currentUpdatesDisplayValue}
          options={updatesRecords.map((r) => ({
            id: getIDValue.updates?.(r),
            label: getDisplayValue.updates?.(r),
          }))}
          isLoading={updatesLoading}
          onSelect={({ id, label }) => {
            setCurrentUpdatesValue(
              updatesRecords.find((r) =>
                Object.entries(JSON.parse(id)).every(
                  ([key, value]) => r[key] === value
                )
              )
            );
            setCurrentUpdatesDisplayValue(label);
            runValidationTasks("updates", label);
          }}
          onClear={() => {
            setCurrentUpdatesDisplayValue("");
          }}
          onChange={(e) => {
            let { value } = e.target;
            fetchUpdatesRecords(value);
            if (errors.updates?.hasError) {
              runValidationTasks("updates", value);
            }
            setCurrentUpdatesDisplayValue(value);
            setCurrentUpdatesValue(undefined);
          }}
          onBlur={() =>
            runValidationTasks("updates", currentUpdatesDisplayValue)
          }
          errorMessage={errors.updates?.errorMessage}
          hasError={errors.updates?.hasError}
          ref={updatesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "updates")}
        ></Autocomplete>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              company,
              title,
              source,
              link,
              recruiter,
              status,
              notes,
              updates,
              updateIds: values,
            };
            const result = onChange(modelFields);
            values = result?.updateIds ?? values;
          }
          setUpdateIds(values);
          setCurrentUpdateIdsValue("");
        }}
        currentFieldValue={currentUpdateIdsValue}
        label={"Update ids"}
        items={updateIds}
        hasError={errors?.updateIds?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("updateIds", currentUpdateIdsValue)
        }
        errorMessage={errors?.updateIds?.errorMessage}
        setFieldValue={setCurrentUpdateIdsValue}
        inputFieldRef={updateIdsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Update ids"
          isRequired={false}
          isReadOnly={false}
          value={currentUpdateIdsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.updateIds?.hasError) {
              runValidationTasks("updateIds", value);
            }
            setCurrentUpdateIdsValue(value);
          }}
          onBlur={() => runValidationTasks("updateIds", currentUpdateIdsValue)}
          errorMessage={errors.updateIds?.errorMessage}
          hasError={errors.updateIds?.hasError}
          ref={updateIdsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "updateIds")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
