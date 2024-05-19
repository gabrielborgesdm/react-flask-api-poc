import copy


def get_mock_with_custom_args(mock_dict, **kwargs):
    custom_mock = copy.deepcopy(mock_dict)
    for key, value in kwargs.items():
        custom_mock[key] = value

    return custom_mock
