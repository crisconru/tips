from typing import List, Union

from PyFace.piface import PiFace

MAX_ADDRESS = 4
MIN_PIN = 0
MAX_PIN = 7
LOW = 0
HIGH = 1

class Raspberry:
    def __init__(self, config: List[dict]) -> None:
        self.pifaces: List[PiFace] = []
        self.config = config
        self.__set_config()

    def __set_config(self):
        # Each board config
        for pf_config in self.config:
            # Get address
            address = pf_config.get('address', None)
            # Check board is connected
            if address is not None:
                pf = PiFace(address)
                if pf.open():
                    print(f'Raspberry has PiFace {address}')
                    # Add PiFace board
                    self.pifaces.append(pf)
                    # Set inputs topics
                    t_inputs = pf_config.get('inputs', {})
                    self.__set_inputs_topics(t_inputs)
                    # Set outputs topics
                    t_outputs = pf_config.get('outputs', {})
                    self.__set_outputs_topics(t_outputs)

    def __set_inputs_topics(self, inputs_topics: dict):
        pf = self.pifaces[-1]
        print(f'Raspbbery - PiFace {pf.address} adding inputs topics')
        for index, topics in inputs_topics.items():
            # Suscribe
            subscribe_topic = topics.get('subscribe', None)
            if subscribe_topic is not None:
                pf.inputs_topics_sub[index] = subscribe_topic
                print(
                    f'{index} Input Subscribe = {subscribe_topic}')
            # Publish
            publish_topic = topics.get('publish', None)
            if publish_topic is not None:
                pf.inputs_topics_pub[index] = publish_topic
                print(f'{index} Input Publish   = {publish_topic}')
        self.pifaces[-1] = pf

    def __set_outputs_topics(self, outputs_topics: dict):
        pf = self.pifaces[-1]
        print(f'Raspbbery - PiFace {pf.address} adding outputs topics')
        for index, topics in outputs_topics.items():
            # Suscribe
            subscribe_topic = topics.get('subscribe', None)
            if subscribe_topic is not None:
                pf.outputs_topics_sub[index] = subscribe_topic
                print(f'{index} Output Subscribe = {subscribe_topic}')
            # Publish
            publish_topic = topics.get('publish', None)
            if publish_topic is not None:
                pf.outputs_topics_pub[index] = publish_topic
                print(f'{index} Output Publish   = {publish_topic}')
        self.pifaces[-1] = pf

    def number_of_boards(self):
        return len(self.pifaces)

    def read_inputs(self) -> list:
        inputs = []
        for piface in self.pifaces:
            inputs += piface.read_inputs()
        return inputs

    def process_message(self, topic: str, value: Union[int, str]) -> dict:
        # For each board, check topic
        for piface in self.pifaces:
            # Check output topic
            if piface.is_output_topic(topic):
                return piface.write_output(topic, value)
            # Check input topic
            if piface.is_input_topic(topic):
                return piface.read_input(topic)
        return {}