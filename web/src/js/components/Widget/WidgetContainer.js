import graphql from 'babel-plugin-relay/macro'
import { createFragmentContainer } from 'react-relay'

import Widget from 'js/components/Widget/WidgetComponent'

export default createFragmentContainer(Widget, {
  widget: graphql`
    fragment WidgetContainer_widget on Widget {
      type
      ...BookmarksWidgetContainer_widget
      ...SearchWidgetContainer_widget
      ...ClockWidgetContainer_widget
      ...NotesWidgetContainer_widget
      ...TodosWidgetContainer_widget
    }
  `,
  user: graphql`
    fragment WidgetContainer_user on User {
      ...BookmarksWidgetContainer_user
      ...SearchWidgetContainer_user
      ...ClockWidgetContainer_user
      ...NotesWidgetContainer_user
      ...TodosWidgetContainer_user
    }
  `,
})
