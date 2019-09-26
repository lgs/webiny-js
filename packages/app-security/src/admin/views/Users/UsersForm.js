// @flow
import * as React from "react";
import { i18n } from "@webiny/app/i18n";
import { Form } from "@webiny/form";
import { Grid, Cell } from "@webiny/ui/Grid";
import { Input } from "@webiny/ui/Input";
import { CircularProgress } from "@webiny/ui/Progress";
import { ButtonPrimary } from "@webiny/ui/Button";
import GroupsAutocomplete from "./../Components/GroupsAutocomplete";
import RolesAutocomplete from "./../Components/RolesAutocomplete";
import AvatarImage from "./../Components/AvatarImage";
import { useCrud } from "@webiny/app-admin/hooks/useCrud";
import { validation } from "@webiny/validation";
import {
    SimpleForm,
    SimpleFormHeader,
    SimpleFormFooter,
    SimpleFormContent
} from "@webiny/app-admin/components/SimpleForm";

const t = i18n.ns("app-security/admin/users/form");

const UsersForm = () => {
    const { form } = useCrud();
    return (
        <Form {...form}>
            {({ data, form, Bind }) => (
                <SimpleForm>
                    {form.loading && <CircularProgress />}
                    <SimpleFormHeader title={data.fullName || t`N/A`} />
                    <SimpleFormContent>
                        <Grid>
                            <Cell span={6}>
                                <Grid>
                                    <Cell span={12}>
                                        <Bind
                                            name="email"
                                            validators={validation.create("required,email")}
                                        >
                                            <Input label={t`E-mail`} />
                                        </Bind>
                                    </Cell>
                                    <Cell span={12}>
                                        <Bind
                                            name="password"
                                            validators={validation.create(
                                                data.id ? "password" : "required,password"
                                            )}
                                        >
                                            <Input
                                                autoComplete="off"
                                                description={
                                                    data.id && t`Type a new password to reset it.`
                                                }
                                                type="password"
                                                label={t`Password`}
                                            />
                                        </Bind>
                                    </Cell>
                                </Grid>
                            </Cell>
                            <Cell span={6}>
                                <Grid>
                                    <Cell span={12}>
                                        <Bind name="avatar">
                                            <AvatarImage label={t`Avatar`} />
                                        </Bind>
                                    </Cell>
                                </Grid>
                            </Cell>

                            <Cell span={6}>
                                <Bind name="firstName" validators={validation.create("required")}>
                                    <Input label={t`First Name`} />
                                </Bind>
                            </Cell>
                            <Cell span={6}>
                                <Bind name="lastName" validators={validation.create("required")}>
                                    <Input label={t`Last name`} />
                                </Bind>
                            </Cell>

                            <Cell span={12}>
                                <Bind name="groups">
                                    <GroupsAutocomplete label={t`Groups`} />
                                </Bind>
                            </Cell>

                            <Cell span={12}>
                                <Bind name="roles">
                                    <RolesAutocomplete label={t`Roles`} />
                                </Bind>
                            </Cell>
                        </Grid>
                    </SimpleFormContent>
                    <SimpleFormFooter>
                        <ButtonPrimary type="primary" onClick={form.submit} align="right">
                            {t`Save user`}
                        </ButtonPrimary>
                    </SimpleFormFooter>
                </SimpleForm>
            )}
        </Form>
    );
};

export default UsersForm;
