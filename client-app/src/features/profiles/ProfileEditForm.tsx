/* eslint-disable react-refresh/only-export-components */
import * as Yup from 'yup'
import { Profile } from '../../app/models/profile'
import { Form, Formik } from 'formik'
import MyTextInput from '../../app/common/form/MyTextInput'
import MyTextArea from '../../app/common/form/MyTextArea'
import { Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../app/stores/store'

interface Props {
    setEditMode: (editMode: boolean) => void
}

export default observer(function ProfileForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore()

    const validationSchema = Yup.object({
        displayName: Yup.string().required('The display name is required')
    })

    function handleFormSubmit(values: Partial<Profile>) {
        updateProfile(values).then(() => {
            setEditMode(false)
        })        
    }

    return(
        <Formik 
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}} 
            validationSchema={validationSchema}
            onSubmit={values => handleFormSubmit(values)}>
            {({ isValid, isSubmitting, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextArea rows={3} name='bio' placeholder='Add your bio' />
                    <Button disabled={!dirty || !isValid} loading={isSubmitting} floated='right' positive type='submit' content='Update Profile' />
                </Form>
            )}
        </Formik>
    )
})