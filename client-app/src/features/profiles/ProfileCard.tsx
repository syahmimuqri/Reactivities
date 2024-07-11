/* eslint-disable react-refresh/only-export-components */
import { Card, Icon, Image } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

interface Props {
    profile: Profile
}

export default observer(function ProfileCard({profile}: Props) {
    function truncate(str: string | undefined) {
        if (str) {
            return str.length > 40 ? str.substring(0, 37) + '...' : str
        }
    }
    return (
        <Card as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncate(profile.bio)}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
                20 followers
            </Card.Content>
        </Card>
    )
})