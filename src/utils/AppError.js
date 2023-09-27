// There are some errors that we don't know the source of that may happen in a case that 
// we may expect an error that comes from that line but there are different ones you may 
// not expect from that one line so we set a generic error and don't leak the message directly
// to the user like other errors