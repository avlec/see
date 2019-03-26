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

    def __init__(self, filters=None):
        if filters == None:
            print("No filters provided to agregator, expecting them to be added later.")
        else:
            self.filters = filters

    def add_filter(self, filter, filter_name=None):
        if filter_name == None:
            self.filters.append((filter.__class__.__name__, filter))
        else:
            self.filters.append((filter_name, filter))

    def get_results(self):


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
    fltrag = FilterAgregator()
    fltrag.add_filter(fltr)
    fltrag.add_filter(fltrr)
    fltrag.run_filters()

if __name__ == "__main__":
    main(sys.argv[1:])

