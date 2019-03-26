#!/usr/bin/python3

import sys

class FilterBase:
    def __init__(self, filename):
        try:
            self.inputfile = open(filename)
        except FileNotFoundError:
            self.inputfile = None
            print("No file found.")
        except TypeError:
            self.inputfile = None
            print("No file specified.")
    def generate_warn(self):
        return { 'warning' : 'No defined behaviour.'}

class LineCountFilter(FilterBase):
    inputfile = None
    def __init__(self, filename):
        FilterBase.__init__(self, filename)

    def generate_warn(self):
        if self.inputfile == None:
            return "{}"

        counter = 0
        for line in self.inputfile:
            counter += 1
        return {
            'result': counter,
            'warning': counter > 250
        }

class FilterAgregator:
    filters = []

    filter_results = {}

    """
    Complexity here allows filters to be added in a large number of possible ways.
    1. Single filter (uses class name instead of programmed name str)
    2. Tuple of (str name, filter)
    3. List of 1 and or 2
    """
    def __init__(self, filters=None):
        if filters == None:
            print("No filters provided to agregator, expecting them to be added later.")
            return
        # If list, process each item in the list.
        if isinstance(filters, list):
            for filter in filters:
                if isinstance(filter, tuple):
                    if isinstance(filter[1], FilterBase) and isinstance(filter[0], str):
                        print("Adding filter {0}".format(filter[0]))
                        self.filters.append(filter)
                    elif isinstance(filter[0], FilterBase) and isinstance(filter[1], str):
                        print("Adding filter {0}".format(filter[1]))
                        self.filters.append(tuple(reversed(filter)))
                    else:
                        print("Error filter agregator, type isn't instance of FilterBase")
                else:
                    if isinstance(filter, FilterBase):
                        self.filters.append((filter.__class__.__name__, filter))
                    else:
                        print("Error filter agregator, type isn't instance of FilterBase")
        # If not a list, is tuple or is just a filter?
        else:
            if isinstance(filters, tuple):
                print("Adding filter {0}".format(filters[0]))
                self.filters.append(filters)
            else:
                print("Adding filter {0}".format(filters.__class__.__name__))
                self.filters.append((filters.__class__.__name__, filters))

    def add_filter(self, filter, filter_name=None):
        if not isinstance(filter, FilterBase):
            print("Filter type isn't good.")
            return

        if filter_name == None:
            self.filters.append((filter.__class__.__name__, filter))
        else:
            self.filters.append((filter_name, filter))

    def get_results(self):
        return self.filter_results

    def run_filters(self):
        for filter in self.filters:
            if self.filter_results.get(filter[0]) == None:
                self.filter_results[filter[0]] = filter[1].generate_warn()
            else:
                print("Conflicting filter names. Filter {0} has been skipped.".format(filter[0]))

def main(argv):
    fltr = LineCountFilter(argv[0])
    fltrr = FilterBase(argv[0])

    # fltrag = FilterAgregator([(fltr.__class__.__name__, fltr)])
    fltrag = FilterAgregator([fltr, (fltrr, "Base")])
    fltrag.run_filters()
    print(fltrag.get_results())

if __name__ == "__main__":
    main(sys.argv[1:])

