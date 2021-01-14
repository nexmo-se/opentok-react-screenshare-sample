# Basic Video Chat with Screensharing

This is a sample app showing how to use [opentok-react](https://github.com/opentok/opentok-react) with camera and screen capabilities.

## Run the project

1. npm i 
2. npm run start

## How to add screen share

The screenshare stream is an additional [Publisher](https://tokbox.com/developer/sdks/js/reference/Publisher.html) in the Opentok Session. 
Even though the `opentok-react` gives the option to change videoSource from camera to screen to an existing OTPublisher object, it is best practice to not do it on the flight as it could lead to some permission or timing problem. 

The best practice is to create an additional OTPublisher as shown on the code and use conditional rendering to publish/unpublish the screensharing stream.

Example: 

```javascript


```