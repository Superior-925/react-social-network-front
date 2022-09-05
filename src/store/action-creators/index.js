import * as AvatarActionCreators from './avatar'
import * as ProfileActionCreators from './profile'
import * as PostsActionCreators from './posts'
import * as RequestsActionCreators from './requests'
import * as PageOwnerActionCreators from './page-owner'
import * as PagePathActionCreators from './page-path'

export default {
    ...AvatarActionCreators,
    ...ProfileActionCreators,
    ...PostsActionCreators,
    ...RequestsActionCreators,
    ...PageOwnerActionCreators,
    ...PagePathActionCreators
}
