# Changelog

### 0.4.0
- Allow for `<Section/>` blocks to have `null` components (useful for conditional renders)

### 0.3.1
- Fix issue that caused an error to be thrown if a child is `null`

### 0.3.0
- Add `Container` block to allow for better conditional rendering

### 0.2.0
- Add ability to color messages

### 0.1.0
- Add all additional props to the top level `<Message/>` component
- Remove `token` / `channel` prop since they are out of scope for the component

### 0.0.4
- Fix issue where `<Actions/>` block would have incorrect type

### 0.0.3
- Fix issue where `<Button/>` element was outputting `actionId` when it should be `action_id`

### 0.0.1 / 0.0.2
- Initial release
