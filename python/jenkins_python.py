# SOURCE - https://python-jenkins.readthedocs.io/en/latest/examples.html
# SOURCE - https://python-jenkins.readthedocs.io/en/latest/api.html
import jenkins
import sys, getopt
import xml.etree.ElementTree as ET

class JenkinsInteracter:
    username = ''
    password = ''
    server = None

    def __init__(self,username,password):
        self.username = username
        self.password = password
        self.server = jenkins.Jenkins('http://localhost:8080', username=self.username, password=self.password)

#--------------------------------------------------

# def convert_xml_file_to_str():
#     tree = ET.parse(path_to_config_file)
#     root = tree.getroot()
#     return ET.tostring(root, encoding='utf8', method='xml').decode()

# def main():
#     target_server = jenkins.Jenkins(url, username=username, password=password)
#     config = convert_xml_file_to_str()
#     target_server.create_job(job_name, config)
#--------------------------------------------------

    def initial_connection_signal(self):
        user = self.server.get_whoami()
        version = self.server.get_version()
        print('\nHello %s from Jenkins %s\n' % (user['fullName'], version))


    def get_all_jobs(self):
        jenkins_jobs = self.server.get_all_jobs()

        return jenkins_jobs


    def get_job_info(self, job_name):
        my_job = self.server.get_job_info(job_name, 0)
        
        return my_job

    
    def get_pligins_info(self):
        plugins = self.server.get_plugins_info()

        return plugins
    

    def configure_view(self, action, view_name):
        if action == "create":
            self.server.create_view(view_name, jenkins.EMPTY_VIEW_CONFIG_XML)
        elif action == "delete":
            self.server.delete_view(view_name)

    
    def get_views_info(self, view_name):
        view_config = self.server.get_view_config(view_name)
        views = self.server.get_views()
        
        return views, view_config


    def get_job_queue(self):
        queue_info = self.server.get_queue_info()
        
        return queue_info


    def get_build_env_vars(self, job_name, build_num):
        build_env_vars = self.server.get_build_env_vars(job_name, build_num)
        
        return build_env_vars


    def get_job_list(self):
        job_list = self.server.get_jobs()

        return job_list

def main(argv):

    try:
        opts, args = getopt.getopt(argv, "hu:p:", ["username=", "password="])
    except getopt.GetoptError:
        print
        'python Job-Duration-Metrics.py -u <username> -p <password>'
        sys.exit(2)

    for opt, arg in opts:
        if opt == '-h':
            print
            'python Job-Duration-Metrics.py -u <username> -p <password>'
            sys.exit()
        elif opt in ("-u", "--username"):
            username = arg
        elif opt in ("-p", "--password"):
            password = arg

    jenkins_interacter = JenkinsInteracter(username,password)
    
    jenkins_interacter.initial_connection_signal()
    
    all_jobs = jenkins_interacter.get_all_jobs()
    print("ALL JOBS -\n{}\n" .format(all_jobs))
    
    job_info = jenkins_interacter.get_job_info("short-java-build-pipeline")
    print("JOB INFO -\n{}\n" .format(job_info))
    
    plugins_info = jenkins_interacter.get_pligins_info()
    print("PLUGINS INFO -\n{}\n" .format(plugins_info))
    
    jenkins_interacter.configure_view("delete", "yahmtest")

    views, view_config = jenkins_interacter.get_views_info("All")
    print("VIEWS -\n{}\nVIEW CONFIG -\n{}\n" .format(views, view_config))

    queue_info = jenkins_interacter.get_job_queue()
    print("QUEUE INFO -\n{}\n" .format(queue_info))

    build_env_vars = jenkins_interacter.get_build_env_vars("short-java-build-pipeline", 30)
    print("BUILD ENV VARS -\n {}\n" .format(build_env_vars))

    job_list = jenkins_interacter.get_job_list()
    print("LIST OF JOBS -\n {}\n" .format(job_list))

    


if __name__ == "__main__":
   main(sys.argv[1:])
