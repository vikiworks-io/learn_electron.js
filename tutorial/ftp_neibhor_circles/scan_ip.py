'''
Scan device ip address in the name network

    Author:

    Viki (a) Vignesh Natarajan
    https://vikiworks.io

'''
import os
import socket
import multiprocessing
import subprocess
from multiprocessing import Process, Queue
import signal
import time
from time import sleep
import sys
import threading


debug = False
#debug = True
child_process_list = []
parent_process_id = None
class_c_address_len = 255
number_of_process = 30
search_timeout = 200 #seconds
pingable_ip_list = []

#For Python3 pingtimeout is working
ping_timeout = 2 #seconds

#For Python2 pingtimeout is notworking
ping_timeout = None #seconds

queue_get_timeout = 1 #seconds

def ping_ip(parent_write_queue, child_write_queue):
    cmd = "ping"
    arg1 = "-c1"
    timeout_seconds=1

    with open(os.devnull, 'w') as null_device:
        ''' Fetch IP one by one and ping - Likewise all the child will be doing but with unique ip address '''
        while True:
            if parent_write_queue.empty():
                return

            try:
                ip = parent_write_queue.get(timeout=queue_get_timeout) #timeout in seconds
            except:
                if debug == True :
                    print("QUEUE TIMEOUT ERROR");
                return

            try:
                #ping -c1 <ip address>
                timeout_seconds = 10

                if debug == True :
                    print("[ "+str(os.getpid())+" ] [ PINGING  : "+str(ip)+" ]")

                if ping_timeout == None:
                    subprocess.check_call([cmd, arg1, ip],stdout=null_device, stderr=null_device)
                else:
                    subprocess.check_call([cmd, arg1, ip],stdout=null_device, stderr=null_device, timeout=ping_timeout)

                child_write_queue.put(ip)
                #print("[ DISCOVERED NEIGHBOUR  : "+str(ip)+"\t]")

            except:
                child_write_queue.put(None)

                if debug == True :
                    print("[ IP ADDRESS ] [ "+str(ip)+" ] [ NOT REACHABLE ]");

                pass

            #sleep(1)

    return

def get_host_ip():
    dns = "8.8.8.8"
    port = 80
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect((dns, port))
    host_ip = s.getsockname()[0]
    s.close()
    return host_ip

def parent_signal_handler(signum, frame):
    global child_process_list, parent_process_id
    pid = os.getpid()

    if (pid != None) and (pid != parent_process_id):
        if debug == True :
            print("[ERROR:  SOME PROCESS OTHER THAN PARENT GOT (CTRL + C) Signal]")
            return

    if debug == True :
        print("[PARENT_PROCESS :  "+str(pid)+" ] GOT ( CTRL + C ) EVENT")

    for child_process in child_process_list:
        try:
            if child_process.is_alive():
                if debug == True :
                    print("[ PARENT ] [ TERMINATING ][ CHILD_PROCESS_ID : "+str(child_process.pid)+" ]")

                child_process.terminate()
        except:
            pass

    sys.exit(-1);

def child_signal_handler(signum, frame):
    ''' TERMINATING OTHER CLIENTS AND ITSELF
    '''
    if debug == True :
        print("[ CHILD GOT (CTRL + C) SIGNAL] [ TERMINATING OTHER CLIENTS ]")

    my_pid = os.getpid()
    current_process = None

    for child_process in child_process_list:
        if(child_process.pid == my_pid):
            current_process = child_process
            continue
        try:
            if child_process.is_alive():
                if debug == True :
                    print("[ CHILD ] [ TERMINATING ][ CHILD_PROCESS_ID : "+str(child_process.pid)+" ]")

                child_process.terminate()

        except:
            pass

    try:
        #Terminate current child process
        if (current_process !=None) and (current_process.is_alive()):
            if debug == True :
                print("[ CHILD ] [ TERMINATING ITSELF][ CHILD_PROCESS_ID : "+str(current_process.pid)+" ]")

            current_process.terminate()
    except:
        pass


def parent_signal_listener():
    try:
        signal.signal(signal.SIGINT, parent_signal_handler)
    except:
        if debug == True :
            print("[ ERROR: UNABLE TO SET HANDLER FOR SIGNAL -> SIGINT ]")

def child_signal_listener():
    try:
        signal.signal(signal.SIGINT, child_signal_handler)
    except:
        if debug == True :
            print("[ ERROR: UNABLE TO SET HANDLER FOR SIGNAL -> SIGINT ]")


def print_results(child_write_queue):
    if debug == True:
        print("[PRINTING RESULTS]")
    result_cnt = 0
    global pingable_ip_list
    start_time = time.time()
    while True:
        current_time = time.time()
        time_delta = current_time - start_time

        if (int(time_delta) >= search_timeout):
            if debug == True:
                print("[ SEARCH TIME EXPIRED ]")
            time.sleep(0.5)
            break

        if child_write_queue.empty():
            time.sleep(0.25)
            continue

        try:
            ip = child_write_queue.get() #Remove data from queue [ Not reading, removing ;-) ]

            if ip != None:
                pingable_ip_list.append(ip)
                print(str(ip))
            else:
                if debug == True:
                    print("[ DISCOVERED NEIGHBOUR  : "+"None"+"\t]")

            result_cnt += 1

            if result_cnt >= class_c_address_len :
                #print("[ IP SEARCH COMPLETED ]")
                break
        except:
            if debug == True:
                print("[ QUEUE GET EXCEPTION ]")
            break

        time.sleep(.25)

    if debug == True:
        print("[ RAISING SIGINT ]")
    os.kill(os.getpid(), signal.SIGINT)


def DiscoverNeighborIPs():
    global child_process_list, parent_process_id

    my_host_ip = get_host_ip()
    #print("[ HOST IP : "+str(my_host_ip)+" ]\n")
    split_ip = my_host_ip.split('.')
    base_ip = split_ip[0] + '.' + split_ip[1] + '.' + split_ip[2] + '.'


    ''' Queue where parent adds all usable ip address in a subnet and
        child removes ip address from queue
    '''
    parent_write_queue = Queue()

    '''  Queue where child adds pingable ip address and
        parent removes ip address from queue
    '''
    child_write_queue = Queue()

    #Add 255 ip addresses for child to ping in the parent_write_queue
    for i in range(class_c_address_len):
        ip_address = base_ip + str(i+1)
        parent_write_queue.put(ip_address)

    ''' Ask child process to listen ctrl+c signal '''
    child_signal_listener()

    child_process=None
    for cp in range(number_of_process):
        child_process = Process(target=ping_ip, args=(parent_write_queue, child_write_queue))
        child_process_list.append(child_process)
        child_process.start()
        child_process = None

    thread = threading.Thread(target=print_results, args=(child_write_queue,))
    thread.daemon = True
    thread.start()

    for child_process in child_process_list:
        ''' Block Parent Process from terminating until this child_process completes its job '''
        child_process.join()

    '''[ MAKE PARENT PROCESS LISTNER TO ( CTRL + C) SIGNAL ]'''
    parent_signal_listener()

    #pingable_ip_list = print_results(child_write_queue)

    return


def main():
    global parent_process_id
    parent_process_id = os.getpid()

    if debug == True :
        print("[ Parent Process ID : "+str(os.getpid())+" ]")

    DiscoverNeighborIPs()
    ip_list = pingable_ip_list

    #print("\n[ REPORT: DISCOVERED IP ADDRESS LIST ]")
    #for ip in ip_list:
    #    print("\t => "+str(ip))

if __name__ == '__main__':
    main()
