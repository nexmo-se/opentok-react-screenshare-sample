import React from "react";
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from "opentok-react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connection: "Connecting",
      publishVideo: true,
      publishScreen: false,
      publishingScreen: false,
    };

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({ connection: "Connected" });
      },
      sessionDisconnected: () => {
        this.setState({ connection: "Disconnected" });
      },
      sessionReconnected: () => {
        this.setState({ connection: "Reconnected" });
      },
      sessionReconnecting: () => {
        this.setState({ connection: "Reconnecting" });
      },
    };

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log("User denied access to media source");
      },
      streamCreated: () => {
        console.log("Publisher stream created");
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher stream destroyed because: ${reason}`);
      },
    };

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log("Subscriber video enabled");
      },
      videoDisabled: () => {
        console.log("Subscriber video disabled");
      },
    };

    this.publisherScreenEventHandlers = {
      accessDenied: () => {
        console.log("User denied access to media Screen source");
      },
      streamCreated: () => {
        console.log("Publisher SCreen created");
      },
      mediaStopped: () => {
        this.setState({ publishScreen: false });
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher Screen destroyed because: ${reason}`);
      },
    };
  }

  onSessionError = (error) => {
    this.setState({ error });
  };

  onPublish = () => {
    console.log("Publish Success");
    this.setState({ error: null });
  };

  onPublishError = (error) => {
    this.setState({ error });
  };

  onPublishScreen = () => {
    console.log("Publish Screen Success");
    this.setState({ error: null });
  };

  onPublishScreenError = (error) => {
    console.log("Publish Screen Error", error);
    this.setState({ error, publishScreen: false });
  };

  onSubscribe = () => {
    console.log("Subscribe Success");
  };

  onSubscribeError = (error) => {
    this.setState({ error });
  };

  toggleVideo = () => {
    this.setState((state) => ({
      publishVideo: !state.publishVideo,
    }));
  };

  toggleScreenshare = () => {
    this.setState((state) => ({
      publishScreen: !state.publishScreen,
    }));
  };

  render() {
    const { apiKey, sessionId, token } = this.props.credentials;
    const { error, connection, publishVideo, publishScreen } = this.state;
    return (
      <div>
        <div id="sessionStatus">Session Status: {connection}</div>
        {error ? (
          <div className="error">
            <strong>Error:</strong> {JSON.stringify(error.message)}
          </div>
        ) : null}
        <button id="videoButton" onClick={this.toggleVideo}>
          {publishVideo ? "Disable" : "Enable"} Video
        </button>
        <button id="screenButton" onClick={this.toggleScreenshare}>
          {publishScreen ? "Unpublish" : "Publish"} Screen
        </button>
        <OTSession
          apiKey={apiKey}
          sessionId={sessionId}
          token={token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <OTPublisher
            properties={{ publishVideo, width: 200, height: 200 }}
            onPublish={this.onPublish}
            onError={this.onPublishError}
            eventHandlers={this.publisherEventHandlers}
          />
          {publishScreen && (
            <OTPublisher
              properties={{ videoSource: "screen", width: 200, height: 200 }}
              onPublish={this.onPublishScreen}
              onError={this.onPublishScreenError}
              eventHandlers={this.publisherScreenEventHandlers}
            />
          )}
          <OTStreams>
            <OTSubscriber
              properties={{ width: 100, height: 100 }}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    );
  }
}
