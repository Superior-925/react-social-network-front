import * as AvatarActionCreators from './avatar'
import * as ProfileActionCreators from './profile'
import * as PostsActionCreators from './posts'

export default {
    ...AvatarActionCreators,
    ...ProfileActionCreators,
    ...PostsActionCreators
}
