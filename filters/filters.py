#!/usr/bin/python3

import sys

class FilterBase:

    inputfile = None

    """
    Most derived classes will just have a good time calling
    this constructor instead of their own.
    """
    def __init__(self, filename):
        try:
            self.inputfile = open(filename)
        except FileNotFoundError:
            self.inputfile = None
            print("ERR: file found.", file=sys.stderr)
        except TypeError:
            self.inputfile = None
            print("ERR: No file specified.", file=sys.stderr)

    """
    This function is required to be implemented to get any
    useful results from the filter.
    """
    def generate_warn(self):
        return { 'warning' : 'No defined behaviour.'}


class LineCountFilter(FilterBase):
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


import re

class CheckIfContainsPassword(FilterBase):
    def __init__(self, filename):
        FilterBase.__init__(self, filename)

    def generate_warn(self):
        if self.inputfile == None:
            return "{}"

        found = False
        for line in self.inputfile:
            if re.search("\b{0}\b".format("password"),line):    #if string found is in current line then print it
                print(line)
                found = True
        return {
            'result': found,
            'warning': 'Please make sure you have no passwords stored in file'
        }
class FilterAgregator:
    """
    Each filter is stored as (str, filter)
    """
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
            print("LOG: No filters provided to agregator, expecting them to be added later.")
            return
        # If list, process each item in the list.
        if isinstance(filters, list):
            for filter in filters:
                self.add_filter(filter)
        # If not a list, is tuple or is just a filter?
        else:
            self.add_filter(filters)

    def add_filter(self, filter):
        # Is this a tuple of class/date or just a class?
        if isinstance(filter, tuple):
            # Determine which is the filter and which is the string
            #	if there isn't a filter string combo error.
            if isinstance(filter[1], FilterBase) and isinstance(filter[0], str):
                print("LOG: Adding filter {0}".format(filter[0]))
                self.filters.append(filter)
            elif isinstance(filter[0], FilterBase) and isinstance(filter[1], str):
                print("LOG: Adding filter {0}".format(filter[1]))
                self.filters.append(tuple(reversed(filter)))
            else:
                print("ERR: filter agregator, type isn't instance of FilterBase", file=sys.stderr)
        else:
            # Is this a derived filter?
            if isinstance(filter, FilterBase):
                self.filters.append((filter.__class__.__name__, filter))
            else:
                print("ERR: filter agregator, type isn't instance of FilterBase", file=sys.stderr)

    def get_results(self):
        return self.filter_results

    def run_filters(self):
        for filter in self.filters:
            # If the filter with the corresponding name hasn't been run
            if self.filter_results.get(filter[0]) == None:
                # Add the results of the filter to the dictionary
                self.filter_results[filter[0]] = filter[1].generate_warn()
            else:
                print("LOG: Conflicting filter names. Filter {0} has been skipped.".format(filter[0]))

def main(argv):
    fltr = LineCountFilter(argv[0])
    fltrr = FilterBase(argv[0])

    # fltrag = FilterAgregator([(fltr.__class__.__name__, fltr)])
    fltrag = FilterAgregator([fltr, (fltrr, "Base")])
    fltrag.run_filters()
    print(fltrag.get_results())

if __name__ == "__main__":
    main(sys.argv[1:])
